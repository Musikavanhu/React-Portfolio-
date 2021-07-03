import react, { Component } from 'react';

export default class About extends Component {
    render() {
        let resumeData = this.props.resumeData;
        return(
            <section id="about">
                <div className="row">
                    <img className="profile-picture" src="images/Profile.jpg" alt="">
</img>

                </div>
                <div className="nine colums main-col">
                    <h2> About Me </h2>
                    <p>
                        {
                            resumeData.aboutme
                        }
                    </p>
                    <div className="row">
                        <div className="columns contact-details">
                            <h2> Contact Details</h2>
                            <p className="address">
                                <span>{resumeData.name}</span>
                                <br></br>
                            <span>
                                {resumeData.address}
                            </span>
                            <br></br>
                            <span>{resumeData.website}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}