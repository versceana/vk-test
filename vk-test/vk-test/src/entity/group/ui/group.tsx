import { Group } from "../model/group.ts";
import styles from "./group.module.scss";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export interface GroupItemProps extends Group {}

export const GroupItem = ({
  name,
  avatar_color,
  closed,
  members_count,
  friends,
}: GroupItemProps) => {
  const animationVariats = {
    hidden: {
      height: 0,
    },
    visible: {
      height: "auto",
    },
  };

  const [showFriendsList, setShowFriendsList] = useState(false);
  const onButtonClick = () => {
    friends?.length && setShowFriendsList((prevValue) => !prevValue);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.group}>
        <div
          className={styles.circle}
          style={{ background: avatar_color || "#ccc" }}
        ></div>
        <div>{name}</div>
        <div>{closed ? "Закрытая" : "Открытая"}</div>
        <div>Участников: {members_count}</div>
        <div>
          Друзей в группе:{" "}
          <button
            className={styles.count}
            onClick={onButtonClick}
            disabled={!friends?.length}
          >
            {friends?.length || 0}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showFriendsList && (
          <motion.div
            variants={animationVariats}
            className={styles.friendList}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {friends?.map((friend) => (
              <div>
                {friend.first_name} {friend.last_name}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
