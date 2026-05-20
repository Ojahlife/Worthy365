import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://jyupwjwcvjvprimilrkx.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjkwOWE4MjdjLTRlYTYtNDU5ZS04M2Q1LTllMTQzNTA2YjliZiJ9.eyJwcm9qZWN0SWQiOiJqeXVwd2p3Y3ZqdnByaW1pbHJreCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY3MTI4MTcxLCJleHAiOjIwODI0ODgxNzEsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.Q0MhxG1ExvwmZACYnEUF9nt5KlvH9BC9NbR1tTgdapE';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };