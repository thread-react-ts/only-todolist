import { FC, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const ButtonSubmit: FC<Props> = (props) => {
  const { label } = props;

  return (
    <button
      className="button-submit"
      {...props}
    >
      {label}
    </button>
  );
};

export const ButtonBackHome: FC<Props> = (props) => {
  const { label } = props;

  return (
    <button
      className="button-back-home"
      {...props}
    >
      {label}
    </button>
  );
};

export const ButtonEdit: FC<Props> = (props) => {
  const { label } = props;

  return (
    <button
      className="button-edit"
      {...props}
    >
      {label}
    </button>
  );
};

export const ButtonClose: FC<Props> = (props) => {
  const { label } = props;

  return (
    <button
      className="button-close"
      {...props}
    >
      {label}
    </button>
  );
};
