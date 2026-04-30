const blogFeed = document.getElementById('blog-feed');

// Fetch Blogs in Real-Time
db.collection('blogs').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
    blogFeed.innerHTML = ''; // Clear feed
    snapshot.forEach(doc => {
        const blog = doc.data();
        blogFeed.innerHTML += `
            <article class="blog-card">
                <img src="${blog.imageUrl || 'https://via.placeholder.com/400'}" alt="Blog Image">
                <h2>${blog.title}</h2>
                <p>${blog.content.substring(0, 150)}...</p>
                <small>By ${blog.author} on ${new Date(blog.createdAt?.toDate()).toLocaleDateString()}</small>
            </article>
        `;
    });
});

// Admin Function to Post (to be used in admin.html)
function postBlog(title, content, imageUrl) {
    return db.collection('blogs').add({
        title,
        content,
        imageUrl,
        author: auth.currentUser.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}
