import React from 'react'

function Avatar(props: any) {

    const { width, height, src, alt } = props;

    return (
        <div style={{
            width: width,
            height: height,
            overflow: 'hidden',
            borderRadius: '999px'
        }}>
            <img
                src={src}
                alt={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }} />
        </div>
    )
}

export default Avatar
