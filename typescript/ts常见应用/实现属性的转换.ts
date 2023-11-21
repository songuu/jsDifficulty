interface Props {
  a?: string;
  b?: string;
  c?: string;
  d: string;
}

type SelectRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

type NewProps = SelectRequired<Props, "b" | "c">; // { a?: string, b: string, c: string, d: string }

const a: NewProps = {
  b: "1",
  c: "2",
  d: "1",
};
