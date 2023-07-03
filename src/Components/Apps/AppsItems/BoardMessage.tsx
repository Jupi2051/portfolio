import { Variants, motion } from "framer-motion";
import { duration } from "moment";

interface Props {
    name: string,
    content: string
}

const WritingAnimation: Variants = {
    hidden: {opacity: 0,},
    visible: {opacity: 1,},
};

function BoardMessage(props: Props)
{
    const contentLetters = props.content.split("");
    const nameLetters = props.name.split("");

    const StaggerIncrementValue = (props.content.length + props.name.length) * 0.01; // 1% increase per letter

    const ParentMessageAnimation: Variants = {
        visible: {
            transition: {
                duration: 1,
                staggerChildren: Math.max(0.08 - (StaggerIncrementValue * 0.08), 0.01),
            }
        }
    };

    return <motion.div className="board-message-container" variants={{visible: {transition:{staggerChildren: 0.5, duration: 1}}}}>
        <motion.h1 className="board-message-name" variants={ParentMessageAnimation}>
        {
            nameLetters.map((letter, index) => {
                return <motion.span variants={WritingAnimation} key={letter+""+index}>
                    {letter}
                </motion.span>
            })
        }
        </motion.h1>
        <motion.span className="board-message-notation">:</motion.span>
        <motion.p className="board-message-content" variants={ParentMessageAnimation}>
            {
                contentLetters.map((letter, index) => {
                    return <motion.span variants={WritingAnimation} key={letter+""+index}>
                        {letter}
                    </motion.span>
                })
            }
        </motion.p>
    </motion.div>
}

export default BoardMessage;