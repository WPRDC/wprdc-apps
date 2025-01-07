import { UserProfile } from "@wprdc/types";
import { Button } from "@wprdc/ui";

export interface AccountRequestItemProps {
  userProfile: UserProfile;
  onDeny: (profile: UserProfile) => void;
  onApprove: (profile: UserProfile) => void;
}

export function AccountRequestItem(props: AccountRequestItemProps) {
  const { userProfile, onApprove, onDeny } = props;
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
          <Button className="" onPress={() => onApprove(userProfile)}>
            Approve
          </Button>
          <Button className="" onPress={() => onDeny(userProfile)}>
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
