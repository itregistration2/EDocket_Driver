
import React, { useState, useEffect } from 'react';
import firebase from 'react-native-firebase';

export default PushNotification = (props, route) => {

    const [token, setToken] = useState([]);

    useEffect(() => {
        checkPermission()
        createNotificationListeners();
    }, []);


    const requestPermission = async () => {
        console.log("permission")
        try {
            await firebase.messaging().requestPermission();
            getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }

    const checkPermission = () => {
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    setToken(token)
                } else {

                    requestPermission();
                }
            }).catch(error => {
                console.log("Error", error)
            });
    }


    const getToken = () => {
        console.log("Token get:")
        
        console.log(firebase.messaging().getToken())
    }

    const createNotificationListeners = () => {
        const notificationListener = firebase.notifications().onNotification(async (notification) => {
          //  console.log(notification)
            const localNotification = new firebase.notifications.Notification()
                .setNotificationId(notification._notificationId)
                .setTitle(notification._title)
                .setBody(notification._body)
                .setData(notification._data)
                .android.setSmallIcon("@mipmap/ic_launcher")
                //.android.setColor("#386a67")
                .android.setChannelId("EdocketDriver")

            const action = new firebase.notifications.Android.Action(
                "snooze",
                "ic_launcher",
                " "
            );
            action.setShowUserInterface(false);
            localNotification.android.addAction(action);

            const channel = new firebase.notifications.Android.Channel(
                "EdocketDriver",
                "EdocketDriver",
                firebase.notifications.Android.Importance.Max
            );

            firebase.notifications().android.createChannel(channel);
            firebase.notifications().displayNotification(localNotification).catch(err => console.error("NotificationERROR=====", err));
        });


        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            console.log(notificationOpen.notification.data);
            console.log("Back Ground 1");

        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */

        firebase.notifications().getInitialNotification()
            .then((notificationOpen) => {
                console.log(notificationOpen)
            })

        /*
        * Triggered for data only payload in foreground
        * */
        const messageListener = firebase.messaging().onMessage((message) => {
            const localNotification = new firebase.notifications.Notification({
                show_in_foreground: false,
            })
                .setTitle(message._data.title)
                .setBody(message._data.body)
                .setData(message._data)
                .android.setSmallIcon("@mipmap/ic_launcher")
                .android.setLargeIcon("@mipmap/ic_launcher")
                .android.setColor("#ffffff")
                .android.setPriority(firebase.notifications.Android.Priority.High)
                .android.setChannelId("EdocketDriver")
                .android.setAutoCancel(true)
                .android.setBadgeIconType(firebase.notifications.Android.BadgeIconType.Large)
                .setSound("default");

            const action = new firebase.notifications.Android.Action(
                "snooze",
                "ic_launcher",
                " "
            );
            action.setShowUserInterface(false);
            localNotification.android.addAction(action);
            // console.log(localNotification)

            const channel = new firebase.notifications.Android.Channel(
                "EdocketDriver",
                "EdocketDriver",
                firebase.notifications.Android.Importance.Max
            );
            firebase.notifications().android.createChannel(channel);
            firebase.notifications().displayNotification(localNotification).catch(err => console.error("NotificationERROR=====", err));
        });


    }

    return (
        <>
        </>
    )

}
