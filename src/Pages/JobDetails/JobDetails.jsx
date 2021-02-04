import React, { useEffect, useState } from "react";
import { getOneJob } from "../../Api/jobs";
import { Row, Col, Button, Container, Spinner } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../JobDetails/JobDetails.css";
import { useSelector,useDispatch } from "react-redux";
 
 
function JobDetails(props) {
  const state = useSelector((state)=>state)
 
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleFav, setToggleFav] = useState(false);
  
  const dispatch = useDispatch();
  
  const handleFav =  () => {
    // const toggle = props.favourites.jobs.some((jobs) => jobs.id == jobDetails.id);
    
    // if (toggle){
    //   dispatch({type:"REMOVE_JOB_FROM_FAVS",payload:jobDetails})
    //   setToggleFav(!toggle)
    //   } else {
    //   dispatch({type:"ADD_JOB_TO_FAVS",payload:jobDetails})
    //   setToggleFav(toggle)
    //   }
    if (toggleFav){
    dispatch({type:"REMOVE_JOB_FROM_FAVS",payload:jobDetails})
    setToggleFav(!toggleFav
      )
    } else {
    dispatch({type:"ADD_JOB_TO_FAVS",payload:jobDetails})
    setToggleFav(!toggleFav
      )
    }
  };


  useEffect(() => {
    getJobInfo();
  }, []);

  const getJobInfo = async () => {
    const jobId = props.match.params.jobId;
    const job = await getOneJob(jobId);
    setJobDetails(job);
     
    setIsLoading(false);
  };

  const htmlJobDescription = () => {
    return { __html: jobDetails?.description };
  };

  const body = () => {
    return (
      <div>
        {jobDetails && (
          <Container>
            <Row className="d-flex justify-content-center align-items-start mt-5">
              <Col lg={6} md={12} className="p-5">
                <img
                  src={jobDetails?.company_logo}
                  alt="company-logo"
                  className="logo"
                  style={{width: "400px"}}
                />
                <div style={{display: "inline-block"}}>
                <Link to="/">
                  <Button className="every-button mt-5">
                    {" "}
                    <FontAwesomeIcon
                      icon={faBackward}
                      className="icon-padding"
                    />
                    Go back
                  </Button>
                </Link>
                {state.user.username ? (
                  toggleFav ? (
                    <Button
                      className="every-button mt-5"
                      onClick={() => handleFav()
                        // props.addToFavs(jobDetails)
                      }
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="icon-padding "
                        style={{ color: "red" }}
                      />
                    </Button>
                  ) : (
                    <Button
                      className="every-button mt-5"
                      onClick={() => handleFav()
                        // props.addToFavs(jobDetails)
                      }
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="icon-padding"
                        style={{ color: "white" }}
                      />
                    </Button>
                  )
                ) : (
                  <div>**Log in to save job details</div>
                )}
                </div>
              </Col>
              <Col lg={6} md={12} className="px-4">
                <h2>{jobDetails?.company}</h2>
                <div dangerouslySetInnerHTML={htmlJobDescription()} />
                
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner animation="border" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        body()
      )}
    </Container>
  );
}

export default withRouter(
  JobDetails
);
