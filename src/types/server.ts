export type Status = "success" | "error";

export type ServerResponse = {
  status: Status;
  message: string;
};
