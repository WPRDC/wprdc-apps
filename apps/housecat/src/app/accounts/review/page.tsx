import { cookies } from "next/headers";
import { fetchAccounts, fetchLoggedInToHousecat } from "@wprdc/api";
import { AccountRequestItem } from "@/components/account-request-item.tsx";
import { redirect } from "next/navigation";

export default async function AccountReviewPage() {
  const cookieJar = await cookies();
  const token = cookieJar.get("hct")?.value;

  const userList = await fetchAccounts(token, { approved: false });

  const loggedIn = await fetchLoggedInToHousecat(token);
  if (!loggedIn) {
    redirect("/accounts/login");
  }

  return (
    <div className="">
      <div className="">
        <h2>Accounts Pending Review</h2>
        {!!userList && !!userList.length ? (
          userList.map((user) => (
            <AccountRequestItem
              key={user.user.email}
              userProfile={user}
              token={token}
            />
          ))
        ) : (
          <div className="">
            <p>All done!</p>
            <p>There are currently no more accounts to review.</p>
          </div>
        )}
      </div>
    </div>
  );
}
