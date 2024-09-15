import { getUserData } from "@/actions/actions";
import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SettingsForm from "../components/SettingsForm";
class UserNotFoundError extends Error {}

async function SettingsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  const data = await getUserData(user.id);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <SettingsForm
          firstName={data?.firstName as string}
          lastName={data?.lastName as string}
          email={data?.email as string}
        />
      </Card>
    </section>
  );
}

export default SettingsPage;
