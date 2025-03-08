
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  className?: string;
  userInitials?: string;
  imageSrc?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  className, 
  userInitials = 'U', 
  imageSrc 
}) => {
  return (
    <Button 
      variant="ghost" 
      className={cn('rounded-full p-0 h-auto w-auto', className)}
      aria-label="User profile"
    >
      <Avatar className="h-10 w-10 border-2 border-quiz-pink/50 transition-all duration-300 hover:border-quiz-pink">
        <AvatarImage src={imageSrc} />
        <AvatarFallback className="bg-quiz-darker text-white">
          {userInitials}
        </AvatarFallback>
      </Avatar>
    </Button>
  );
};

export default UserAvatar;
