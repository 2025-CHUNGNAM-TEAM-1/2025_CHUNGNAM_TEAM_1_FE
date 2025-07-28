import SVGDefaultProfile from "../assets/svgs/available_profiles/SVGDefaultProfile";
import SVGProfile1Act from "../assets/svgs/available_profiles/SVGProfile1Act";
import SVGProfile2Act from "../assets/svgs/available_profiles/SVGProfile2Act";
import SVGProfile3Act from "../assets/svgs/available_profiles/SVGProfile3Act";
import SVGProfile4Act from "../assets/svgs/available_profiles/SVGProfile4Act";
import SVGProfile5Act from "../assets/svgs/available_profiles/SVGProfile5Act";
import SVGProfile6Act from "../assets/svgs/available_profiles/SVGProfile6Act";
import SVGProfile1InAct from "../assets/svgs/unavailble_profiles/SVGProfile1InAct";
import SVGProfile2InAct from "../assets/svgs/unavailble_profiles/SVGProfile2InAct";
import SVGProfile3InAct from "../assets/svgs/unavailble_profiles/SVGProfile3InAct";
import SVGProfile4InAct from "../assets/svgs/unavailble_profiles/SVGProfile4InAct";
import SVGProfile5InAct from "../assets/svgs/unavailble_profiles/SVGProfile5InAct";
import SVGProfile6InAct from "../assets/svgs/unavailble_profiles/SVGProfile6InAct";

const savedProfileSvgs = [
    SVGDefaultProfile, // id: 1
    SVGProfile1Act,    // id: 2
    SVGProfile2Act,    // id: 3
    SVGProfile3Act,    // id: 4
    SVGProfile4Act,    // id: 5
    SVGProfile5Act,    // id: 6
    SVGProfile6Act,    // id: 7
];

const deathProfileSvgs = [
    SVGProfile1InAct,
    SVGProfile2InAct,
    SVGProfile3InAct,
    SVGProfile4InAct,
    SVGProfile5InAct,
    SVGProfile6InAct,
]

export function getProfileSVGById(id) {
    if (id < 1 || id > 7) return null;
    return savedProfileSvgs[id - 1];
}

export function getDeathProfile() {
    return deathProfileSvgs;
}
