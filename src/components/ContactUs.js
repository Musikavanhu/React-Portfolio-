import react, { Component } from 'react';

export default class ContactUs extends Component{
    render(){
        let resumeData = this.props.resumeData;
        return (
            <section id="contact">
<div className="row ssection-head">
    <div className="ten columns">
        <p className="lead"> 
        If any questions or concerns do arise please feel free to contact me 
        at anytime.
        </p>
    </div>
</div>
<div className="row">
    <aside className="eight colums footer-widgets">
        <div className="widget">
            <h4> Found in :
                {resumeData.linkedinId}
            </h4>
        </div>
    </aside>
</div>
            </section>
        );
    }
}