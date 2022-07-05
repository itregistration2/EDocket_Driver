
import firebase from "react-native-firebase";
import type { NotificationOpen } from "react-native-firebase";

export default async (message: NotificationOpen) => {
  //  console.log(message)
    const localNotification = new firebase.notifications.Notification({})
        .setTitle(message.data.title)
        .setBody(message.data.body)
        .setData(message.data)
        .android.setSmallIcon("@mipmap/ic_launcher")
        .android.setLargeIcon("@mipmap/ic_launcher")
        .android.setColor("#ffffff")
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setChannelId("EdocketDriver")
        .android.setBadgeIconType(firebase.notifications.Android.BadgeIconType.Large)
        .setSound("default")
        .android.setAutoCancel(true);

    const channel = new firebase.notifications.Android.Channel(
        "EdocketDriver",
        "EdocketDriver",
        firebase.notifications.Android.Importance.Max
    ).setDescription("My Ask apps test channel");
    // Create the channel
    firebase.notifications().android.createChannel(channel);
    firebase
        .notifications()
        .displayNotification(localNotification)
        .catch(err => console.error("NotERROR=====", err));

    return Promise.resolve(message);
};
