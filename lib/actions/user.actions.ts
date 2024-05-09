"use server"

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, ProcessorTokenCreateResponse, Products } from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";


const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,

} = process.env

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();

        const response = await account.createEmailPasswordSession(email, password);

        return parseStringify(response);
    } catch (error) {
        console.error(error);
    }
}

export const signUp = async ({ password, ...userData }: SignUpParams) => {

    const { email, firstName, lastName } = userData;

    let newUserAccount;

    try {
        // Create a user account
        const { account, database } = await createAdminClient();

        newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);

        if (!newUserAccount) throw new Error("Error creating user account")

        const dwollaCustomerUrl = await createDwollaCustomer({
            ...userData,
            type: 'personal',
        })

        if (!dwollaCustomerUrl) throw new Error("Error creating dwolla customer");

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl)

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
                ...userData,
                userId: newUserAccount.$id,
                dwollaCustomerId,
                dwollaCustomerUrl,

            }
        )

        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUser);
    } catch (error) {
        console.error(error);
    }
}

// ... your initilization functions
export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();

        const user = await account.get();

        return parseStringify(user)
    } catch (error) {
        //   return null;
        console.log(error);
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        cookies().delete('appwrite-session');

        await account.deleteSession('current');
    } catch (error) {
        return null;
    }
}

// CREATE PLAID LINK TOKEN
export const createLinkToken = async (user: User) => {
    try {
        const tokeParams = {
            user: {
                client_user_id: user.$id,
            },
            client_name: user.firstName + user.lastName,
            products: ["auth"] as Products[],
            language: "en",
            country_codes: ["US"] as CountryCode[],
        };

        const response = await plaidClient.linkTokenCreate(tokeParams);

        return parseStringify({ linkToken: response.data.link_token });
    } catch (error) {
        console.error(
            "An error occurred while creating a new Horizon user:",
            error
        );
    }
};



export const createBankAccount = async ({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    sharableId, }: createBankAccountProps) => {
    try {
        const { database } = await createAdminClient();

        const bankAccount = await database.createDocument(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                sharableId
            }
        )

        return parseStringify(bankAccount);
    } catch (error) {
        console.error(error);
    }
}

export const exchangePublicToken = async ({ publicToken, user }: exchangePublicTokenProps) => {
    try {
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;


        // Get Account information from plaid using access token

        const accountResponse = await plaidClient.accountsGet({
            access_token: accessToken
        });

        const accountData = accountResponse.data.accounts[0];

        // Create a processor token form Dwolla using access token and account ID
        const request: ProcessorTokenCreateRequest = {
            access_token: accessToken,
            account_id: accountData.account_id,
            processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
        }

        const processorTokenResponse = await plaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;


        // Creating a funding source URL for the account using the dwolla customer ID, processor token, and bank name.
        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken,
            bankName: accountData.name,
        })

        // if the funding source URL is not created, throw an error
        if (!fundingSourceUrl) throw Error


        // Create a bank account using the UserID, item ID, account ID, access token, funding source URL, and sharable ID
        await createBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            sharableId: encryptId(accountData.account_id),

        })

        // Revalidate the path to reflect the changes
        revalidatePath("/")

        // Return Success message
        return parseStringify({
            publicTokenExchange: "complete"
        })
    } catch (error) {
        console.error("An error occurred while creating exchanging token: ", error);
    }
}