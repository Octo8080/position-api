import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@1.34.0'

export const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
)

const errorResponse = new Response(
  "",
  { headers: { "Content-Type": "application/json" },status: 500},
)


serve(async () => {
  const { data } = await supabaseClient.from('positions').select().eq('id', 1)

  if(!Array.isArray(data)) return errorResponse
  if(data.length !== 1) return errorResponse

  return new Response(
    JSON.stringify({position: data[0]}),
    { headers: { "Content-Type": "application/json" } },
  )
})

