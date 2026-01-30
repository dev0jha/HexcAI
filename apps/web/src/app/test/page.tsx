import { apiClient } from "@/lib/eden";

export default async function Page() {
  /*
   * fetching data with eden on server
   * **/
  const { data: health, error } = await apiClient.health.get();

  if (error) {
    console.error("Error fetching message:", error);
    return;
  }

  return (
    <div>
      <p>{health.message}</p>
      <p>{health.status}</p>
    </div>
  );
}
