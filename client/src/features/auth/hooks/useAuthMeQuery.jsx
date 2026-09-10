import { queryKeys } from '@/lib/react-query/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { authMe } from '../services/auth.service';

export const useAuthMeQuery = () => {
    return useQuery({
        queryKey: queryKeys.auth,
        queryFn: authMe,
        staleTime: 0,
        gcTime: 1000 * 60 * 5,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        retry: false,
    });
};
