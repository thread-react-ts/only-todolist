import { FC } from "react";

interface Props {
  title: string;
  content: string;
  priority: number;
  id: string;
}

export const CardDetail: FC<Props> = (props) => {
  const { title, content, priority } = props;
  const isCompleted = priority === 1 ? "COMPLETED" : "NOT COMPLETED";

  return (
    <div className="h-60 md:h-full flex flex-col gap-3 border-2 border-slate-50 dark:border-slate-600 rounded-lg p-2 divide-y divide-slate-50 dark:divide-slate-600">
      <div className="flex-col md:flex-row flex items-center justify-between ">
        <p className="text-lg text-slate-900 dark:text-slate-200">
          Title: {title}
        </p>
        <p className="text-lg text-slate-900 dark:text-slate-200">
          {isCompleted}
        </p>
      </div>
      <div className="flex items-start text-start  overflow-auto">
        <p className="text-lg text-slate-900 dark:text-slate-200 ">
          Content: {content}
        </p>
      </div>
    </div>
  );
};
