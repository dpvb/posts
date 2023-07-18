import { format } from "date-fns";

const formatTimeString = (date: Date) => {
    return format(date, "hh:mmaaa • MMM d, yyyy");
};

export default formatTimeString;
