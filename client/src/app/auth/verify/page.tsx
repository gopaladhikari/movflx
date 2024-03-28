type Props = {
  searchParams: { token: string };
};

export default function page({ searchParams: { token } }: Props) {
  console.log(token);
  return <div>page</div>;
}
