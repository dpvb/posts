import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import SignInButton from '@/components/SignInButton'

export default async function Login() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect('/')
    }

    return (
        <div className="flex flex-col items-center h-screen gap-6 justify-center">
            <h1 className="text-white font-bold text-8xl">Posts</h1>
            <SignInButton />
        </div>
    )
}
