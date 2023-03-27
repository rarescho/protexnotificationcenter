import React, { useState } from "react";
import axios from "axios";
import { ReactSession } from 'react-client-session';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {AiFillAccountBook} from 'react-icons/ai'


export default function TimeLine() {

    return (
        <VerticalTimeline>
          <p> Buongiorno {ReactSession.get("username")} </p>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date="2011 - present"
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<AiFillAccountBook />}
        >
          <h3 className="vertical-timeline-element-title">Ordine Chiuso</h3>
          <h4 className="vertical-timeline-element-subtitle">Utente: PIPPO</h4>
          <p> Attenzione l'ordine O\23232 è stato chiuso.          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2010 - 2011"
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<AiFillAccountBook />}
        >
          <h3 className="vertical-timeline-element-title">Spedizione eseguita</h3>
          <h4 className="vertical-timeline-element-subtitle">Utente: pluto</h4>
          <p>
            La spedizione nr B0002123 è stata inviata.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2008 - 2010"
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<AiFillAccountBook />}
        >
          <h3 className="vertical-timeline-element-title">Richiesta di invio</h3>
          <h4 className="vertical-timeline-element-subtitle">Utente: caio</h4>
          <p>
            L'utente caio ha chiesto un invio di 100 mt dell'articolo SARAIERI.
          </p>
        </VerticalTimelineElement>      
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="April 2013"
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          icon={<AiFillAccountBook />}
        >
          <h3 className="vertical-timeline-element-title">E' stato autorizzato con successo un'invio di filato.</h3>
          <h4 className="vertical-timeline-element-subtitle"></h4>
          <p>
            Bravo coglione!
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="11 November 2012"
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          icon={<AiFillAccountBook />}
        >
          <h3 className="vertical-timeline-element-title">dsadsadasdasdasdasdasdasdasasdasddas</h3>
          <h4 className="vertical-timeline-element-subtitle">asdasdasdasdasdas</h4>
          <p>
            asdasdsaaaaaaaaaaaaaaaaaa
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="11 November 2011"
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          icon={<AiFillAccountBook />}
        >
          <h3 className="vertical-timeline-element-title">saddddddddddddddddddddddddddddddddddd</h3>
          <h4 className="vertical-timeline-element-subtitle">asdddddddddddddd</h4>
          <p>
            asddddddddddddddddddddddddddd
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
          icon={<AiFillAccountBook />}
        />
      </VerticalTimeline>
    );
}
