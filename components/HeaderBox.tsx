import { getLoggedInUser } from "@/lib/actions/user.actions"

const HeaderBox = async ({ type = "title", title, subtext }: HeaderBoxProps) => {

    const loggedIn = await getLoggedInUser()

    return (
        <div className="header-box">
            <h1 className="header-box-title">
                {title}
                {type === 'greeting' && (
                    <span className="text-bankGradient">
                        &nbsp;{loggedIn?.firstName || "Guest"}
                    </span>
                )}
            </h1>
            <p className="header-box-subtext">{subtext}</p>
        </div>
    )
}

export default HeaderBox
