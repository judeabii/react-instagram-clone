import { Text, Avatar, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import {React} from 'react'
import useGetProfilebyUserID from '../../hooks/useGetProfilebyUserID'
import getTimeDifference from '../../utils/timeAgo'
import { Link } from 'react-router-dom'

const Comments = ({comment}) => {
    const {isLoading, userProfile} = useGetProfilebyUserID(comment.createdBy)
    const screenLoaded = !isLoading && userProfile;

    if (isLoading){
            return <CommentSkeleton/>
        }
    return(
        <>
        {screenLoaded && (
            <Flex justifyContent={"flex-start"} alignItems={"center"} gap={2}>
            <Link to={`/${userProfile.username}`}>
            <Avatar size={"sm"} src={userProfile.profilePic} name={userProfile.name}></Avatar>
            </Link>
            <Flex direction={"column"} gap={0}>
            <Text fontSize={"small"} fontWeight={700}>
                <Link to={`/${userProfile.username}`}>
                {userProfile.username+" "}
                </Link>
                    <Text  as="span" fontWeight={400}>
                        {comment.comment}
                    </Text>
            </Text>
            <Text fontSize={10} color={"gray"}>
                {getTimeDifference(comment.createdAt)}
            </Text>
            </Flex>
        </Flex>
        )}
        </>
    )
}

export default Comments

const CommentSkeleton = () => {
	return (
		<Flex gap={4} w={"full"} alignItems={"center"}>
			<SkeletonCircle h={10} w='10' />
			<Flex gap={1} flexDir={"column"}>
				<Skeleton height={2} width={100} />
				<Skeleton height={2} width={50} />
			</Flex>
		</Flex>
	);
};