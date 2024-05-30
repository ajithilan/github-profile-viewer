import "../styling/Usercard.sass"
import { ReposComponent } from "./ReposComponent";
import { Business, Map } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { Closebtn } from "./closebutton";
import emptyprofile from "../assets/emptyprofile.jpg";
import { RootState } from "../types";

export const UsercardComponent = ()=>{
    const {
        avatar_url,
        name,
        login,
        company,
        location,
        bio,
        followers,
        following,
        public_gists,
        public_repos
    } = useSelector((state:RootState)=>state.user.userRandomValue);
    
    return (
        <div className="usercard_container">
            <section className="details_section">
                <div className="detail_section_1">
                    <div className="avatar_container">
                        <div className="avatar_img_container">
                            <img src={avatar_url ?? emptyprofile} alt="avatar" className="avatar_image"/>
                        </div>
                    </div>
                    <div className="basic_details">
                        <span>{name}</span>
                        <span>{login}</span>
                        <span><Business/>{company ?? '-'}</span>
                        <span><Map/>{location ?? '-'}</span>
                    </div>
                </div>
                <div className="gh_bio">{bio ?? '-'}</div>
                <div className="detail_section_2">
                    <span>{followers} followers</span>
                    <span>{following} following</span>
                    <span>public gists : {public_gists}</span>
                    <span>public repos : {public_repos}</span>
                </div>
            </section>
            <section className="repos_section">
                <ReposComponent/>
            </section>
            <Closebtn/>
        </div>
    )
}