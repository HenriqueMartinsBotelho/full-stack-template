interface Props {
  message: string;
}

export function CustomError({ message }: Props) {
  return <div className="flex flex-col">{message}</div>;
}
