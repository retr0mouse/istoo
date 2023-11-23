import Image from "next/image";
import HelpImage from "../../../images/helpImage.jpg";

export default function Help() {
    return <Image src={HelpImage} alt={"Stop it, get some help"}/>;
}