import { store } from 'react-notifications-component';

export function success(message) {
  store.addNotification({
    title: "Success",
    message: message,
    type: "success",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      //onScreen: true
    },
    width: 300
  });
}

export function error(message) {
  store.addNotification({
    title: "Error",
    message: message,
    type: "danger",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      //onScreen: true
    },
    width: 300
  });
}

export function warning(message) {
  store.addNotification({
    title: "Warning",
    message: message,
    type: "warning",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      //onScreen: true
    },
    width: 300
  });
}

export function info(message) {
  store.addNotification({
    title: "Info",
    message: message,
    type: "info",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      //onScreen: true
    },
    width: 300
  });
}