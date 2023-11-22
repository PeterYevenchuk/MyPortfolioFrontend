import React, { useState, useEffect } from 'react';
import '../homeComponents/styles/homePageStyles.css';
import axios from 'axios';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { pdfjs } from 'react-pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';

function HomePage () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
    
        axios.get(`http://localhost:5031/api/AboutMeInfo`)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error retrieving test list:', error);
                setLoading(false);
                setError("Failed to connect to the server. Please try again later.");
            });
    }, []);

      return (
        <div className='Head'>
            {loading && (
                <div className="LoadingContainer">
                    <p>Loading...</p>
                </div>
            )}
            {error && (
            <div className="ErrorContainer">
                <p>{error}</p>
            </div>
            )}
            {!loading && !error && (
                <div className='User'>
                    <div className='UserGeneralInfo'> 
                        <div className='UserPhoto'>
                            {data.photoMeUrl && <img src={`data:image/;base64,${data.photoMeUrl}`} alt="UserPhotoUrl" />}
                        </div>
                        <div className='GeneralInfo'>
                            <h1>{data.name} {data.surname}</h1>
                            <h2>{data.position}</h2>
                            <p>{data.location}, {data.age} years old</p>
                            <div className="Links">
                                <div className="LinksContainer">
                                {data.links &&
                                    data.links.map(link => (
                                        <div key={link.socialLinkID} className="LinkItem">
                                            <h4>
                                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                    {link.name}
                                                </a>
                                            </h4>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <p>{data.description}</p>
                    </div>
                    </div>
                    <div className="Experiences">
                        <h2>Experiences</h2>
                        {data.experiences &&
                            data.experiences
                            .slice()
                            .reverse()
                            .map(experience => (
                                <div key={experience.experienceID} className="ExperienceItem">
                                    <h3>{experience.position} at {experience.company}</h3>
                                    <p>{experience.dateStart} - {experience.dateFinish ? experience.dateFinish : 'Present'} {experience.place}</p>
                                    <p>{experience.rang}</p>
                                    <p>{experience.description}</p>
                                </div>
                            ))}
                    </div>
                    <div className="Skills">
                        <h2>Skills</h2>
                        <div className="SkillsContainer">
                            {data.skills &&
                                data.skills.map(skill => (
                                    <div key={skill.skillID} className="SkillItem">
                                        <h3>{skill.mySkill}</h3>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="Projects">
                        <h2>Projects</h2>
                        {data.projects &&
                            data.projects
                            .slice()
                            .reverse()
                            .map(projects => (
                                <div key={projects.projectID} className="ProjectItem">
                                    <div className='ProjectPhoto'>
                                        <img src={`data:image/;base64,${projects.photoProjectUrl}`} alt="ProjectPhotoUrl" />
                                    </div>
                                    <h3>{projects.name}</h3>
                                    <p>{projects.description}</p>
                                    <a href={projects.gitHubUrl} target="_blank" rel="noopener noreferrer">
                                        {projects.gitHubUrl}
                                    </a>
                                </div>
                            ))}
                    </div>
                    <div className="Educations">
                        <h2>Educations</h2>
                        {data.educations &&
                            data.educations
                            .slice()
                            .reverse()
                            .map(educations => (
                                <div key={educations.educationID} className="EducationItem">
                                    <h3>{educations.rang} at {educations.university}</h3>
                                    <p>{educations.dateStart} - {educations.dateFinish ? educations.dateFinish : 'Present'}</p>
                                    <p>{educations.speciality}</p>
                                    <p>{educations.description}</p>
                                </div>
                            ))}
                    </div>
                    <div className="Certificates">
                        <h2>Certificates</h2>
                        {data.certificates &&
                            data.certificates
                            .slice()
                            .reverse()
                            .map((certificate) => (
                                <div key={certificate.certificateID} className="CertificateItem">
                                    <CertificateViewer pdfUrl={`data:application/pdf;base64,${certificate.certificatePdf}`} />
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}    

function CertificateViewer({ pdfUrl }) {
    return (
        <div className="CertificatePdf">
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                <Viewer fileUrl={pdfUrl} />
            </Worker>
        </div>
    );
}

export default HomePage;