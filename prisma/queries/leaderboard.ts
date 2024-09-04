import {prisma} from "@/prisma";

export const getLeaderBoard = async () => {
    return prisma.squad.findMany({
        where: {
            banned: false,
        },
        select: {
            id: true,
            name: true,
            score: true,
        },
        orderBy: {
            score: 'desc',
        }
    });
}