import { AppLayout } from "@/components/layout/AppLayout";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { CreateOrganization } from "@/components/auth/CreateOrganization";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!session.session.activeOrganizationId) {
    return <CreateOrganization />;
  }

  return <AppLayout>{children}</AppLayout>;
};

export default DashboardLayout;

