import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const { name, email, company, message } = await request.json();
  const supabase = createClient(await import('next/headers').then(m => m.cookies()));
  const { error } = await supabase.from('messages').insert([
    { name, email, company, message }
  ]);

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, message: 'Message received' }, { status: 200 });
}
