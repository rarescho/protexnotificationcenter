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
  faInbox,
  faTruckFast,
  faFileInvoiceDollar
} from '@fortawesome/free-solid-svg-icons';
import './TimeLine.css'
import WebFont from 'webfontloader';






export default function TimeLine() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Chilanka', 'Lato','Kanit']
      }
    });
   }, []);
  const workIcon = {
    icon: <FontAwesomeIcon icon={faBriefcase} />,
    iconStyle: { background: 'rgb(0, 92, 106)', color: '#ffffff' },
  };
  const inboxIcon = {
    icon: <FontAwesomeIcon icon={faInbox} />,
    iconStyle: { background: 'rgb(233, 30, 99)', color: '#fff' },
  };
  const truchfastIcon = {
    icon: <FontAwesomeIcon icon={faTruckFast} />,
    iconStyle: { background: 'rgb(126, 182, 204)', color: '#fff' },
  };
  const FileInvoiceDollarIcon = {
    icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
    iconStyle: { background: 'rgb(16, 204, 82)', color: '#fff' },
  };
  // const faBuildingsIcon = {
  //   icon: <FontAwesomeIcon icon={faBuildings} />,
  //   iconStyle: { background: 'rgb(16, 204, 82)', color: '#fff' },
  // };

    const [notifications, setNotifications] = useState([]);
    const [notificationsDisponibili, setNotificationsDisponibili] = useState(false);
    const [username, setUsername] = useState ( () => {
      const savedItem = localStorage.getItem("username");
     const parsedItem = JSON.parse(savedItem);
     return parsedItem || "";
     });


    // const username = ReactSession.get("username");
    useEffect(() => {

      const configuration = {
        method: 'POST',
        maxBodyLength: Infinity,
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
        icon: truchfastIcon,
        date: new Date(notification.dataora).toLocaleString(),
        title: notification.title,
        subtitle: notification.subtitle,
        desc: notification.message,
    })).sort((a,b) => a.date< b.date ? 1 : -1) : [
        {
          icon: truchfastIcon,
          date:  new Date(timestamp).toLocaleString(),
          title: 'BENVENUTO NEL SISTEMA DI NOTIFICHE DI PROTEX',
          subtitle: '',
          desc: 'Qui troverai tutte le notifiche che ti vengono inviate da parted dei tuoi colleghi e dal sistema.',
        }] ;
  
    
    return (
      <div className="timeline_grafica">
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <img style={{ width: "23%", alignSelf: "center"}}  src={require('../../assets/protex.png')}/>            
        </div>
        <div className="font-loader" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <p> CIAO {username}, QUESTE SONO LE TUE ULTIME NOTIFICHE.</p>
        </div> 
        <VerticalTimeline >
        {timeline.map((t, i) => {

          const contentStyle =
            i % 2 === 0
              ? { background: 'rgb(126, 182, 204)', color: '#000000' }
              : { background: 'rgb(230, 244, 241)', color: '#000000' };
          const arrowStyle =
          i % 2 ===  0
              ? { borderRight: '7px solid  rgb(126, 182, 204)' }
              : { borderRight: '7px solid  rgb(230, 244, 241)' };

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
    </div>
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
