import {
  ComplainList,
  ShowFeedback,
  Users,
  Welcome,
  Worker,
} from "@/pages/dashboard";
import {
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  FlagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import ComplainPdf from "../complain/ComplainPdf";
const icon = {
  className: "w-5 h-5 text-inherit",
};
const OfficialRoutes = {
  layout: "dashboard",
  pages: [
    {
      icon: <FlagIcon {...icon} />,
      name: "hide",
      path: "/",
      element: <Welcome />,
    },
    {
      icon: <FlagIcon {...icon} />,
      name: "Complaints",
      path: "/complain-list",
      element: <ComplainList admin />,
    },
    {
      icon: <FlagIcon {...icon} />,
      name: "hide",
      path: "/pdf",
      element: <ComplainPdf />,
    },
    {
      icon: <BookmarkIcon {...icon} />,
      name: "Workers",
      path: "/worker",
      element: <Worker />,
    },
    {
      icon: <UserCircleIcon {...icon} />,
      name: "Users",
      path: "/users",
      element: <Users />,
    },
    {
      icon: <ChatBubbleBottomCenterIcon {...icon} />,
      name: "Feedbacks",
      path: "/feedbacks",
      element: <ShowFeedback />,
    },
  ],
};
export default OfficialRoutes;
