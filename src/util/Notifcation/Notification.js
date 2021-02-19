import { notification } from "antd";


export const notificationJira = (type, message, description) => {
    notification[type]({
        message: message,
        description: description,
    });
};