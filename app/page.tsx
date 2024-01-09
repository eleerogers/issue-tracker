import Pagination from "./components/Pagination";

export default function Home({ searchParams }: { searchParams: { page: string }}) {
  const { page } = searchParams

  return (
    <Pagination itemCount={99} pageSize={10} currentPage={Number(page)} />
  )
}
