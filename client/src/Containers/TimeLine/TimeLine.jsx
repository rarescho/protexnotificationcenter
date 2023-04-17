import React, { useState,useEffect } from "react";
import axios from "axios";
import { ReactSession } from 'react-client-session';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faSchool,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import './TimeLine.css'




export default function TimeLine() {
  const workIcon = {
    icon: <FontAwesomeIcon icon={faBriefcase} />,
    iconStyle: { background: 'rgb(33, 150, 243)', color: '#fff' },
  };
  const schoolIcon = {
    icon: <FontAwesomeIcon icon={faSchool} />,
    iconStyle: { background: 'rgb(233, 30, 99)', color: '#fff' },
  };
  const starIcon = {
    icon: <FontAwesomeIcon icon={faStar} />,
    iconStyle: { background: 'rgb(16, 204, 82)', color: '#fff' },
  };

    const [notifications, setNotifications] = useState([]);
    const [notificationsDisponibili, setNotificationsDisponibili] = useState(false);

    useEffect(() => {
      const username = ReactSession.get("username");

      console.log(username);
      const configuration = {
        method: "post",
        url: "https://www.protex-dashboard.it/api/notification/xuser",
        data: {
          auth_protex: username,          
        },
      };

      axios(configuration)
      .then(response => {
        if(response.status === 202){
            console.log("Nessuna notifica trovata");
          }else{
            console.log(response.data);
            setNotificationsDisponibili(true);
            setNotifications(response.data);
          }
      })
      .catch(error => {
       if(error.response.status === 201){
          console.log(error.response.message)
        }else if(error.response.status === 401){
          console.log(error.response.message)
        }else{
          console.error("Errore durante la procedura di ritrovamento notifiche",error);
        }
      });
    }, [username]);
    const timestamp = padRight((Math.floor(Date.now() / 1000)),13,'0');

    const timeline = notificationsDisponibili === true ? notifications.map(notification => ({
        icon: workIcon,
        date: new Date(notification.dataora).toLocaleString(),
        title: notification.title,
        subtitle: notification.subtitle,
        desc: notification.message,
    })): [
        {
          icon: workIcon,
          date:  new Date(timestamp).toLocaleString(),
          title: 'BENVENUTO NEL SISTEMA DI NOTIFICHE DI PROTEX',
          subtitle: '',
          desc: 'Qui troverai tutte le notifiche che ti vengono inviate da parted dei tuoi colleghi e dal sistema.',
        }] ;
  
    
    return (
      <VerticalTimeline>
         <p>Ciao {username}, queste sono le tue ultime notifiche.</p> 
      {timeline.map((t, i) => {
        const contentStyle =
          i === 0
            ? { background: 'rgb(33, 150, 243)', color: '#fff' }
            : undefined;
        const arrowStyle =
          i === 0
            ? { borderRight: '7px solid  rgb(33, 150, 243)' }
            : undefined;

        return (
          <VerticalTimelineElement
            key={i}
            className="vertical-timeline-element--work"
            contentStyle={contentStyle}
            contentArrowStyle={arrowStyle}
            date={t.date}
            {...t.icon}
          >
            {t.title ? (
              <React.Fragment>
                <h3 className="vertical-timeline-element-title">{t.title}</h3>
                {t.subtitle && (
                  <h4 className="vertical-timeline-element-subtitle">
                    {t.subtitle}
                  </h4>
                )}
                {t.desc && <p>{t.desc}</p>}
              </React.Fragment>
            ) : undefined}
          </VerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
    );
}
function padRight(value, length, padding) {
  value = value.toString();
  padding = padding || ' ';
  while (value.length < length) {
    value += padding;
  }
  return value;
}
