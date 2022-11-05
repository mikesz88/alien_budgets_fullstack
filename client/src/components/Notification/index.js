import { notification } from 'antd';

export default function Notification(type, message, description) {
  notification[type]({
    message,
    description,
  });
}
