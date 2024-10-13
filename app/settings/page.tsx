import { getUserData } from "@/actions/actions";
import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SettingsForm from "../components/form/SettingsForm";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function SettingsPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login?post_login_redirect_url=/settings");
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
