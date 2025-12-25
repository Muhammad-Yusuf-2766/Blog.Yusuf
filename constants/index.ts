import {
	Contact2,
	FileCode2,
	FolderArchive,
	Home,
	ListCollapse,
} from 'lucide-react'

export const navLinks = [
	{ name: 'Home', path: '/', icon: Home },
	{ name: 'About', path: '/about', icon: ListCollapse },
	{ name: 'Blogs', path: '/blogs', icon: FileCode2 },
	{ name: 'Archive', path: '/blogs/archive', icon: FolderArchive },
	{ name: 'Contact', path: '/contact', icon: Contact2 },
]
