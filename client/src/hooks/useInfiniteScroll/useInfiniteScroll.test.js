import { renderHook } from "@testing-library/react";
import useInfiniteScroll from './useInfiniteScroll'
import Wrapper from "../Wrapper";

describe('useInfiniteScroll',()=>{

    it('should handle case where data is null or undefined', () => {
        // Mock the useInfiniteQuery hook
        jest.mock('axios', () => ({
          request: jest.fn(() => ({
            data: { data: { docs: [1, 2, 3] } },
            isLoading: false,
            isError: false,
            hasNextPage: false,
            fetchNextPage: jest.fn()
          }))
        }));
  
        
        const { result } =  renderHook(()=> useInfiniteScroll({ request:jest.fn(), id: '1', name: 'jhon' }), {
            wrapper:Wrapper()
          })
  
        // Assert results is an empty array
        expect(result.current.results).toEqual(['ss']);
      });

})