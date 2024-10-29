interface Props {
  status: string;
  error: string;
}

export function TestOutput({ status, error }: Props) {
  return (
    <div>
      <span>{status}</span>
      {error && <p>{error}</p>}
    </div>
  );
}
