import React, { useState, useEffect } from 'react';
import '../homeComponents/styles/homePageStyles.css';
import axios from 'axios';
import NavBar from '../navBarComponents/navBar.js';
import { Element } from 'react-scroll';
import PdfModal from '../pdfViewerComponents/PdfModal.js';

function HomePage () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isPdfModalOpen, setPdfModalOpen] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const handleCertificateClick = (certificate) => {
        if (certificate && certificate.certificatePdf) {
          setSelectedCertificate(certificate.certificatePdf);
          setPdfModalOpen(true);
        } else {
          console.error('Invalid certificate object:', certificate);
        }
      };
    const closePdfModal = () => {
        setSelectedCertificate(null);
        setPdfModalOpen(false);
      };     

    useEffect(() => {
        setError(null);
        setPdfModalOpen(false);
    
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
                    <div className='NavBar'>
                        <NavBar />
                    </div>
                    <div className = 'Page'>
                        <Element name="home">
                            <div className='UserGeneralInfo'> 
                                {data.photoMeUrl && <img src={`data:image/;base64,${data.photoMeUrl}`} alt="UserPhotoUrl" />}
                                <div className='GeneralInfo'>
                                    <h1>{data.name} {data.surname}</h1>
                                    <h2>{data.position}</h2>
                                    <p>{data.location}, {data.age} years old.</p>
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
                                        <div className='Description'>
                                            <p>{data.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Element>
                        <Element name="skills">
                            <div className="Skills">
                                <h2>Skills</h2>
                                <div className="SkillsContainer">
                                        {data.skills && data.skills.length > 0 ? (
                                    <div className="SkillsContainer">
                                        {data.skills.map(skill => (
                                            <div key={skill.skillID} className="SkillItem">
                                                <h4>{skill.mySkill}</h4>
                                            </div>
                                        ))}
                                    </div>
                                    ) : (
                                        <p>No skills available.</p>
                                    )}
                                </div>
                            </div>
                        </Element>
                        <Element name="experiences">
                            <div className="Experiences">
                                <h1>Experiences</h1>
                                {data.experiences && data.experiences.length > 0 ? (
                                <div>
                                    {data.experiences
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
                                ) : (
                                    <p>No experiences available.</p>
                                )}
                            </div>
                        </Element>
                        <Element name="educations">
                            <div className="Educations">
                                <h1>Educations</h1>
                                {data.educations && data.educations.length > 0 ? (
                                <div className='EducationsContainer'>
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
                                ) : (
                                    <p>No educations available.</p>
                                )}
                            </div>
                        </Element>
                        <Element name="projects">
                            <div className="Projects">
                                <h1>Projects</h1>
                                {data.projects && data.projects.length > 0 ? (
                                    data.projects
                                    .slice()
                                    .reverse()
                                    .map(projects => (
                                        <div key={projects.projectID} className="ProjectItem">
                                            <div className='ProjectPhoto'>
                                                <img src={`data:image/;base64,${projects.photoProjectUrl}`} alt="ProjectPhotoUrl" />
                                            </div>
                                            <div className='ProjectInfo'>
                                                <h3>{projects.name}</h3>
                                                <h4>
                                                    <a href={projects.gitHubUrl} target="_blank" rel="noopener noreferrer">
                                                        GitHub
                                                    </a>
                                                </h4>
                                                <p>{projects.description}</p>
                                            </div>
                                        </div>
                                    ))
                                    ) : (
                                        <p>No projects available.</p>
                                    )}
                            </div>
                        </Element>
                        <Element name='certificates'>
                            <div className='Certificates'>
                                <h1>Certificates</h1>
                                {data.certificates && data.certificates.length > 0 ? (
                                <div className='CertificatesGeneral'>
                                    {data.certificates
                                    .slice()
                                    .reverse()
                                    .map((certificate) => (
                                        <div key={certificate.certificateID} className='CertificateItem'>
                                        <img src={require('../homeComponents/dokumentieren.png')} alt='CertificateImage' />
                                        <div className='CertificateNameOverlay' onClick={() => handleCertificateClick(certificate)}>
                                            <h4>{certificate.name}</h4>
                                        </div>
                                        </div>
                                    ))}
                                </div>
                                ) : (
                                <div className='CertificatesGeneral'>
                                    <p>No certificates available.</p>
                                </div>
                                )}
                            </div>
                        </Element>
                    {isPdfModalOpen && <PdfModal base64String={selectedCertificate} onClose={closePdfModal} />}
                </div>
            </div>
        )}
    </div>
  );
}

export default HomePage;