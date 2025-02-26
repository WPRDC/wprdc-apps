"use client";

import { UserProfile } from "@wprdc/types";
import { Button } from "@wprdc/ui";
import { reviewHouseCatAccount } from "@wprdc/api";

export interface AccountRequestItemProps {
  userProfile: UserProfile;
  token?: string;
}

export function AccountRequestItem(props: AccountRequestItemProps) {
  const { userProfile, token } = props;
  const {
    id,
    affiliation,
    category,
    user,
    approved,
    agreedToTerms,
    expirationDate,
    ...fields
  } = userProfile;

  async function handleReview(shouldApprove: boolean, email: string) {
    const response = await reviewHouseCatAccount(shouldApprove, email, token);
  }

  return (
    <div className="">
      <div>
        <h3>{user.email}</h3>
        <div className="">
          <span>Requested on: </span>
          <span>{new Date(user.dateJoined).toLocaleDateString()}</span>
        </div>
        <p className="">{category}</p> <p className="">{affiliation}</p>
        <dl>
          {Object.entries(fields).map(([field, value]) => (
            <div key={field}>
              <dt>{toTitleCase(field)}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="">
        <div></div>
        <div className="">
          <Button className="" onPress={() => handleReview(true, user.email)}>
            Approve
          </Button>
          <Button className="" onPress={() => handleReview(false, user.email)}>
            Deny
          </Button>
        </div>
      </div>
    </div>
  );
}

function toTitleCase(str: string): string {
  const temp = str.replace(/([A-Z])/g, " $1");
  return temp.charAt(0).toUpperCase() + temp.slice(1);
}
