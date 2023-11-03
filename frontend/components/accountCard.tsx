import React, { useEffect, useState } from 'react'
import { Typography, Rating,Card, Box, IconButton, Tooltip, Chip, Badge, Avatar, Stack, Skeleton } from '@mui/material';
import { useUser, useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import EditIcon from '@mui/icons-material/AddAPhoto';
import AdminPanelSettingsIcon from '@mui/icons-material/LocationOn';

interface Profile {
  url: string,
  onUpload: any,
  username: string,
  website: string
}

export default function ProfileCard({ url, onUpload, username, website }: Profile) {
  const user = useUser()
  const session = useSession()
  const supabase = useSupabaseClient()
  const [avatarUrl, setAvatarUrl] = useState("")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path: any) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }
        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
        console.log('Error downloading image: ', data)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }
    if (url) downloadImage(url)
  }, [supabase.storage, url])



  async function uploadAvatar(event: any) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error) {
      console.log('Error : ', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card sx={{ px: 2, py: 4, borderRadius: "0.7rem", mt: 2 }} elevation={0}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Tooltip title="Select Image">
              <IconButton aria-label="upload picture" component="label" >
                <input hidden accept="image/*" type="file" onChange={uploadAvatar}
                  disabled={uploading} />
                <EditIcon color="secondary" />
              </IconButton>
            </Tooltip>
          }
        >
          {session ? (<Avatar alt="user" sx={{ width: "6.5rem", height: "6.5rem", m: 1 }} src={avatarUrl || user?.user_metadata?.avatar_url} />) : (
            <Skeleton animation="wave" variant="circular" sx={{ width: "7rem", height: "7rem", m: 1 }} />
          )}
        </Badge>
        {session ? <Typography component="div" variant="h6">
          {username || user?.user_metadata?.name}
        </Typography>
          : <Skeleton width="60%" />}
        {session ? <Typography variant="subtitle2" color="text.secondary" component="div">
          House Help
        </Typography>
          : <Skeleton />}
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Rating name="read-only" value={3} readOnly />
        </Box>
      </Stack>
    </Card>
  );
}