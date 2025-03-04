import { Dayjs } from "dayjs";
import moment from "moment";
import { NavigateFunction } from "react-router-dom";

export const dateConverter = (date: Dayjs | null) => {
  console.log("utils date", date?.date());
  return moment(date?.date()).format("YYYY-MM-DD");
};

export const tags = ["Angular", "React", "Java", "Micro-Services", "NodeJS"];

export const UpdateQueryParams = (
  param: string,
  toDelete: boolean,
  navigate: NavigateFunction
) => {
  if (toDelete) {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set(param, param);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
  } else {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.delete("taskId");
    navigate(updatedParams.toString());
  }
};

export const convertDate = (dateString: string): string => {
  return moment(dateString).format("DD-MM-yyyy");
};
