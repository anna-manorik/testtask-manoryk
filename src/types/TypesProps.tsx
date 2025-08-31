export type AuthUser = {
    username: string;
    password: string;
};

export type CourseProps = {
    id: number | undefined, 
    title: string, 
    description: string, 
    videoUrl: {
        mp4?: string;
        hls?: string;
    }, 
    price: number,
}

export type CourseListProps = {
    courseList: CourseProps[]
}

export type CartItem = {
    id: number | undefined;
    title: string;
    price: number;
    quantity: number;
};
  
export type CartState = {
    items: CartItem[];
};


export type VideoState = {
  [id: number]: {
    isPlaying: boolean;
    currentTime: number;
  }
}