import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
    const user = await prisma.user.create({
        data:{
           name: 'Leandro',
           email: 'leandrosantino2023@gamil.com',
           avatarUrl: 'https://github.com/leandrosantino.png'
        }
    })

    const account = await prisma.account.create({
        data:{
            name: 'Carteira',
            saldo: 0,
            iconUrl: '',
            userId: user.id
        }
    })

    const category = await prisma.category.create({
        data: {
            nome: 'Cartão de Crédito',
            iconUrl: '',
            type: 'expense',
        }
    })

    await prisma.transaction.create({
        data:{
            date: new Date(),
            frequency: 'unique',
            description: 'Slário',
            ignore: false,
            status: '',
            type:'revenue',
            value: 230.65,
            accountId: account.id,
            userId: user.id,
            categoryId: category.id,
        }
    })
    await prisma.transaction.create({
        data:{
            date: new Date(),
            frequency: 'unique',
            description: 'Cartão',
            ignore: false,
            status: '',
            type:'expense',
            value: 230.65,
            accountId: account.id,
            userId: user.id,
            categoryId: category.id,
        }
    })

    const card = await prisma.card.create({
        data: {
            name: 'Nubank',
            closingDate: 10,
            dueDate: 4,
            limit: 2000,
            accountId: account.id,
            userId: user.id,
        }
    })

    await prisma.cardExpense.create({
        data:{
            date: new Date(),
            description: 'Music',
            frequency: 'unique',
            ignore: false,
            invoiceDate: new Date(),
            value: 15,
            accountId: account.id,
            cardId: card.id,
            categoryId: category.id,
            userId: user.id,
        }
    })

}

main()
