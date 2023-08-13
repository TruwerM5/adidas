export default function() {
    return useState('token', () => useCookie('token'));
}