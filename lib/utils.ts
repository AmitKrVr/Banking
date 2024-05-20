/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { getAccount, getAccounts } from "./actions/bank.actions";
import { getLoggedInUser } from "./actions/user.actions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export const authFormSchema = (type: string) => z.object({
  // sign up
  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3, { message: "First Name should be at least 3 characters long" }),
  lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3, { message: "Last Name should be at least 3 characters long" }),
  address1: type === 'sign-in' ? z.string().optional() : z.string().max(50, { message: "Address should be at most 50 characters long" }),
  city: type === 'sign-in' ? z.string().optional() : z.string().max(50, { message: "City should be at most 50 characters long" }),
  state: type === 'sign-in' ? z.string().optional() : z.string().min(2, { message: "State should be 2 characters long" }).max(2, { message: "State should be 2 characters long" }),
  postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3, { message: "Postal Code should be at least 3 characters long" }).max(5, { message: "Postal Code should be at most 5 characters long" }),
  dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3, { message: "Date of Birth should be at least 3 characters long" }),
  ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3, { message: "SSN should be at least 3 characters long" }),
  // both
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password should be at least 8 characters long" }),
})

export const states = [
  { name: "Alabama", code: "AL", country: "US" },
  { name: "Alaska", code: "AK", country: "US" },
  { name: "Arizona", code: "AZ", country: "US" },
  { name: "Arkansas", code: "AR", country: "US" },
  { name: "California", code: "CA", country: "US" },
  { name: "Colorado", code: "CO", country: "US" },
  { name: "Connecticut", code: "CT", country: "US" },
  { name: "Delaware", code: "DE", country: "US" },
  { name: "Florida", code: "FL", country: "US" },
  { name: "Georgia", code: "GA", country: "US" },
  { name: "Hawaii", code: "HI", country: "US" },
  { name: "Idaho", code: "ID", country: "US" },
  { name: "Illinois", code: "IL", country: "US" },
  { name: "Indiana", code: "IN", country: "US" },
  { name: "Iowa", code: "IA", country: "US" },
  { name: "Kansas", code: "KS", country: "US" },
  { name: "Kentucky", code: "KY", country: "US" },
  { name: "Louisiana", code: "LA", country: "US" },
  { name: "Maine", code: "ME", country: "US" },
  { name: "Maryland", code: "MD", country: "US" },
  { name: "Massachusetts", code: "MA", country: "US" },
  { name: "Michigan", code: "MI", country: "US" },
  { name: "Minnesota", code: "MN", country: "US" },
  { name: "Mississippi", code: "MS", country: "US" },
  { name: "Missouri", code: "MO", country: "US" },
  { name: "Montana", code: "MT", country: "US" },
  { name: "Nebraska", code: "NE", country: "US" },
  { name: "Nevada", code: "NV", country: "US" },
  { name: "New Hampshire", code: "NH", country: "US" },
  { name: "New Jersey", code: "NJ", country: "US" },
  { name: "New Mexico", code: "NM", country: "US" },
  { name: "New York", code: "NY", country: "US" },
  { name: "North Carolina", code: "NC", country: "US" },
  { name: "North Dakota", code: "ND", country: "US" },
  { name: "Ohio", code: "OH", country: "US" },
  { name: "Oklahoma", code: "OK", country: "US" },
  { name: "Oregon", code: "OR", country: "US" },
  { name: "Pennsylvania", code: "PA", country: "US" },
  { name: "Rhode Island", code: "RI", country: "US" },
  { name: "South Carolina", code: "SC", country: "US" },
  { name: "South Dakota", code: "SD", country: "US" },
  { name: "Tennessee", code: "TN", country: "US" },
  { name: "Texas", code: "TX", country: "US" },
  { name: "Utah", code: "UT", country: "US" },
  { name: "Vermont", code: "VT", country: "US" },
  { name: "Virginia", code: "VA", country: "US" },
  { name: "Washington", code: "WA", country: "US" },
  { name: "West Virginia", code: "WV", country: "US" },
  { name: "Wisconsin", code: "WI", country: "US" },
  { name: "Wyoming", code: "WY", country: "US" }
];

interface fetchHomeProps {
  id: string | string[] | undefined,
}

export const fetchHomeData = async ({ id }: fetchHomeProps) => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    console.error('No logged in user');
    return null;
  }

  const accounts = await getAccounts({
    userId: loggedIn.$id
  })

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })

  return { loggedIn, accounts, accountsData, appwriteItemId, account };
}